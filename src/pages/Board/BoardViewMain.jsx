import { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import createContainerApi from '../../api/container/createContainer.api';
import getListContainerApi from '../../api/container/getListContainer.api';
import createItemApi from '../../api/item/createItem.api';
import updatePositionContainerApi from '../../api/container/updatePositionContainer.api';
import updatePositionItemApi from '../../api/item/updatePositionItem';
import AlertBar from '../../components/AlertBar';

// DnD
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

// Components
import Container from './Components/Container';
import Items from './Components/Item';
import Modal from './Components/Modal';
import { useStore } from '../../hook/useStore';
import updateContainerTitle from '../../api/container/updateContainerTitle';

export default function BoardViewMain() {
  const currentBoard = useStore((state) => state.currentBoard);
  const [containers, setContainers] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState();
  const [containerName, setContainerName] = useState('');
  const [currentSelectContainer, setCurrentSelectContainer] = useState({
    id: null,
    title: '',
  });
  const [itemName, setItemName] = useState('');
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [alertBar, setAlertBar] = useState({
    type: '',
    message: '',
    isAlertVisible: false,
  });

  useEffect(() => {
    async function getContainer() {
      const response = await getListContainerApi({ board_id: currentBoard.id });
      if (response.ok) {
        let containers = [];
        if (Array.isArray(response.data.containers)) {
          // sort container by position
          containers = response.data.containers.sort(
            (a, b) => a.position - b.position
          );
          containers = containers.map((container) => {
            if (Array.isArray(container.items)) {
              container.items.sort((a, b) => a.position - b.position);
            }
            return container;
          });
        }
        setContainers(containers);
      }
    }
    getContainer();
  }, [currentBoard]);

  window.Echo.channel(`board.${currentBoard.id}`)
    .listen('CreatedNewContainer', (event) => {
      if (
        !containers.find((container) => container.id === event.container.id)
      ) {
        setContainers((containers) => {
          if (
            containers.find((container) => container.id === event.container.id)
          )
            return containers;
          const newContainers = [
            ...containers,
            {
              id: event.container.id,
              title: event.container.title,
              position: event.container.position,
              items: [],
            },
          ];
          return [...newContainers];
        });
      }
    })
    .listen('CreatedNewItem', (event) => {
      setContainers((containers) => {
        const container = containers.find(
          (container) => container.id === event.item.container_id
        );
        if (!container) return containers;
        if (container.items.find((item) => item.id === event.item.id))
          return containers;
        container.items.push({
          id: event.item.id,
          container_id: event.item.container_id,
          title: event.item.title,
          position: event.item.position,
        });

        return [...containers];
      });
    })
    .listen('UpdatedContainerPosition', (event) => {
      if (Array.isArray(event.containers)) setContainers(event.containers);
    })
    .listen('UpdateContainerTitleEvent', (event) => {
      setContainers((containers) => {
        const newContainers = JSON.parse(JSON.stringify(containers));
        const container = newContainers.find(
          (container) => container.id === event.container.id
        );
        container.title = event.container.title;
        return newContainers;
      });
    })
    .listen('UpdatedItemPosition', (event) => {
      let sortContainers = event.containers.sort(
        (a, b) => a.position - b.position
      );
      setContainers(sortContainers);
      console.log('UpdatedItemPosition', event);
    })
    .listen('UpdateItemEvent', (event) => {
      setContainers((containers) => {
        // Create a deep copy of the containers
        const newContainers = JSON.parse(JSON.stringify(containers));

        const container = newContainers.find(
          (container) => container.id === event.container_id
        );
        const item = container.items.find((item) => item.id === event.item.id);
        item.title = event.item.title;
        item.description = event.item.description;
        item.start_date = event.item.start_date;
        item.due_date = event.item.due_date;
        return newContainers;
      });
    });

  const onAddContainer = async () => {
    if (!containerName) return;
    const response = await createContainerApi({
      board_id: currentBoard.id,
      title: containerName,
      position: containers.length,
    });
    if (response.ok) {
      const newContainer = response.data.container;
      setContainers([
        ...containers,
        {
          id: newContainer.id,
          title: newContainer.title,
          position: newContainer.position,
          items: [],
        },
      ]);
    }
    setContainerName('');
    setShowAddContainerModal(false);
  };

  const onAddItem = async () => {
    if (!itemName) return;
    const container = containers.find((item) => item.id === currentContainerId);
    if (!container) return;
    const response = await createItemApi({
      container_id: currentContainerId,
      title: itemName,
      position: container.items.length,
    });
    if (response.ok) {
      const newItem = response.data.item;
      container.items.push({
        id: newItem.id,
        container_id: newItem.container_id,
        title: newItem.title,
        description: '',
        position: newItem.position,
        start_date: null,
        due_date: null,
      });
      setContainers([...containers]);
    }
    setItemName('');
    setShowAddItemModal(false);
  };

  // Find the value of the items
  function findValueOfItems(id, type) {
    if (type === 'container') {
      return containers.find((item) => item.id === id);
    }
    if (type === 'item') {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.title;
  };

  const findContainerTitle = (id) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return '';
    return container.title;
  };

  const findContainerItems = (id) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return [];
    return container.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        // map position to index
        newItems[activeContainerIndex].items = newItems[
          activeContainerIndex
        ].items.map((item, index) => {
          item.position = index;
          return item;
        });

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        // change container_id of items based on the container they move to
        newItems[overContainerIndex].items = newItems[
          overContainerIndex
        ].items.map((item, index) => {
          item.container_id = overContainer.id;
          item.position = index;
          return item;
        });
        // change position by index of active container
        newItems[activeContainerIndex].items = newItems[
          activeContainerIndex
        ].items.map((item, index) => {
          item.position = index;
          return item;
        });
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      // change container_id of items based on the container they move to
      newItems[overContainerIndex].items = newItems[
        overContainerIndex
      ].items.map((item, index) => {
        item.container_id = overContainer.id;
        item.position = index;
        return item;
      });
      // change position by index of active container
      newItems[activeContainerIndex].items = newItems[
        activeContainerIndex
      ].items.map((item, index) => {
        item.position = index;
        return item;
      });

      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  async function handleDragEnd(event) {
    const { active, over } = event;
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      // map position to index
      newItems = newItems.map((container, index) => {
        container.position = index;
        return container;
      });
      setContainers(newItems);

      // Update the position of the container in the database
      await updatePositionContainerApi({
        board_id: currentBoard.id,
        containers: newItems,
      });
    } else {
      // sort items
      // get all items of all containers
      let items = [];
      containers.forEach((container) => {
        container.items.forEach((item) => {
          items.push(item);
        });
      });
      await updatePositionItemApi({
        board_id: currentBoard.id,
        items: items,
      });
    }

    setActiveId(null);
  }

  const updateContainerTitleHandler = async () => {
    const response = await updateContainerTitle({
      container_id: currentSelectContainer.id,
      title: currentSelectContainer.title,
    });

    if (response.status == 403) {
      setAlertBar({
        type: 'error',
        message: response.data.message,
        isAlertVisible: true,
      });
      return;
    }
    if (!response.ok) {
      setAlertBar({
        type: 'error',
        message: response.data.message,
        isAlertVisible: true,
      });
      return;
    }
    setAlertBar({
      type: 'success',
      message: 'Container Title Updated Successfully',
      isAlertVisible: true,
    });
    document.getElementById('edit_container_modal').close();
  };

  return (
    <div className="flex grow max-w-full">
      {/* Add Container Modal */}
      <Modal
        showModal={showAddContainerModal}
        setShowModal={setShowAddContainerModal}
      >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-3xl font-bold">Add Container</h1>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Container Title"
            name="containername"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          />
          <button className="btn" onClick={onAddContainer}>
            Add Container
          </button>
        </div>
      </Modal>
      {/* Add Item Modal */}
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-3xl font-bold">Add Item</h1>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Item Title"
            name="itemname"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button className="btn" onClick={onAddItem}>
            Add Item
          </button>
        </div>
      </Modal>
      <div className="flex flex-row h-full space-x-5 max-w-full overflow-scroll p-5">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={containers.map((i) => i.id)}>
            {containers.map((container) => (
              <Container
                id={container.id}
                title={container.title}
                key={container.id}
                onAddItem={() => {
                  setShowAddItemModal(true);
                  setCurrentContainerId(container.id);
                }}
                setCurrentSelectContainer={setCurrentSelectContainer}
                setAlertBar={setAlertBar}
              >
                <SortableContext items={container.items.map((i) => i.id)}>
                  <div className="flex items-start flex-col">
                    {container.items.map((i) => (
                      <Items title={i.title} id={i.id} key={i.id} item={i} />
                    ))}
                  </div>
                </SortableContext>
              </Container>
            ))}
            <button
              onClick={() => setShowAddContainerModal(true)}
              className="btn w-80 min-w-80 max-w-80 p-5 h-fit bg-gray-200 rounded-xl"
            >
              <GoPlus className="size-5" />
              Add another Container
            </button>
          </SortableContext>
          <DragOverlay adjustScale={false}>
            {/* Drag Overlay For item Item */}
            {activeId && activeId.toString().includes('item') && (
              <Items id={activeId} title={findItemTitle(activeId)} />
            )}
            {/* Drag Overlay For Container */}
            {activeId && activeId.toString().includes('container') && (
              <Container id={activeId} title={findContainerTitle(activeId)}>
                {findContainerItems(activeId).map((i) => (
                  <Items key={i.id} title={i.title} id={i.id} />
                ))}
              </Container>
            )}
          </DragOverlay>
        </DndContext>
      </div>
      <dialog id="edit_container_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">
            Edit Container Title
          </h3>
          <input
            type="text"
            className="input input-bordered w-full my-5"
            placeholder="Container Title"
            value={currentSelectContainer.title}
            onChange={(e) =>
              setCurrentSelectContainer({
                id: currentSelectContainer.id,
                title: e.target.value,
              })
            }
          />
          <div className="flex flex-row justify-end">
            <button
              onClick={() =>
                document.getElementById('edit_container_modal').close()
              }
              className="btn bg-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={updateContainerTitleHandler}
              className="btn btn-primary text-white"
            >
              Ok
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
