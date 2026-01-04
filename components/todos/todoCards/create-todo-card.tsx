import { TodoCard } from "@/types/todoCard";
import { useRef, useState } from "react";

interface Props {
    todoListId: number,
    addTodoCard: (todoCard: TodoCard) => void
}

export default function CreateTodoCard({ todoListId, addTodoCard }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isShowAdd, setIsShowAdd] = useState<boolean>(false);


    const addCard = async () => {
        const bodyTodoCard: TodoCard = {
            todoListId: todoListId,
            title: inputRef.current!.value,
        }

        if (!bodyTodoCard.title) {
            alert('title must have value')
            return;
        }

        const response = await fetch('/api/todoCard/add', {
            method: 'Post',
            body: JSON.stringify(bodyTodoCard)
        })

        if (response.status == 200) {
            const id = (await response.json()).id;
            bodyTodoCard.id = id;
            setIsShowAdd(false)
            addTodoCard(bodyTodoCard)
            inputRef.current!.value = '';
        }
        else {
            console.log(response)
        }

    }

    return (
        !isShowAdd ? (
            <button
                onClick={() => setIsShowAdd(true)}
                className="add-card"
            >
                + Add another card
            </button>
        ) : (
            <>
                <div className="card-creat">
                    <input className="h-10"
                        ref={inputRef}
                        type="text"
                    />
                    <div className="flex-row ">
                        <button
                            onClick={addCard}
                            className="creat-card  "
                        >
                            Creat card
                        </button> <button onClick={() => setIsShowAdd(false)}> <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 6L18 18M18 6L6 18"
                                stroke="#888"        // رنگ کم‌رنگ‌تر
                                strokeWidth="4"      // تپل‌تر
                                strokeLinecap="round"
                            />
                        </svg></button></div></div>
            </>
        )
    );

}
