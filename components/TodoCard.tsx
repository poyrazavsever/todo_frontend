import React, { useState } from 'react'
import TodoSidebar from './TodoSidebar'

interface TodoCardProps {
    todo?: {
        title: string
        content: string
        category: string
    }
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <div className='flex flex-col justify-between gap-2 py-4 px-6 rounded-md border border-pink-600 bg-pink-500/5 w-full'>

                <h2 className="text-xl font-bold text-neutral-700">
                    {todo?.title || "Todo Title"}
                </h2>

                <p className="text-neutral-500 line-clamp-2 break-words">
                    {todo?.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
                </p>

                <div className='flex items-center justify-between mt-2'>
                    <span className='text-sm py-1 px-2 rounded-full bg-pink-600 text-white'>
                        {todo?.category || "Category"}
                    </span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className='p-2 rounded-full hover:bg-pink-600/10 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path className='fill-pink-600' d="M21 11V3h-8v2h4v2h-2v2h-2v2h-2v2H9v2h2v-2h2v-2h2V9h2V7h2v4zM11 5H3v16h16v-8h-2v6H5V7h6z" />
                        </svg>
                    </button>
                </div>

            </div>

            <TodoSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                todo={todo}
            />
        </>
    )
}

export default TodoCard