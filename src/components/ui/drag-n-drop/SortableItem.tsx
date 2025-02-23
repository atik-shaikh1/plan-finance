import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Goal } from "@/app/page";

export const SortableItem = ({ id, name, priority }: Goal) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 bg-gray-100 rounded-md mb-2">
      {name} - {priority}
    </li>
  );
};