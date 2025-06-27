import React, { useState } from 'react'
import TodoSidebar from './TodoSidebar'
import classNames from 'classnames'

interface TodoCardProps {
    todo?: {
        _id: string
        completed: boolean
        title: string
        content: string
        category: string
    }
    onUpdate: () => void
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onUpdate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <div className={classNames(
                'flex flex-col justify-between gap-2 py-4 px-6 rounded-md border transition-colors',
                {
                    "border-pink-600 dark:border-pink-500 bg-pink-500/5 dark:bg-pink-500/10": !todo?.completed,
                    "border-green-600 dark:border-green-500 bg-green-500/5 dark:bg-green-500/10": todo?.completed
                }
            )}>
                <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-200">
                    {todo?.title || "Todo Title"}
                </h2>

                <p className="text-neutral-500 dark:text-neutral-400 line-clamp-2 break-words">
                    {todo?.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
                </p>

                <div className='flex items-center justify-between mt-2'>
                    <span className={classNames(
                        'py-1 px-2 rounded-full text-sm text-white',
                        {
                            'bg-pink-600 dark:bg-pink-500': !todo?.completed,
                            'bg-green-600 dark:bg-green-500': todo?.completed
                        }
                    )}>
                        {todo?.category || "Category"}
                    </span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className='p-2 rounded-full hover:bg-pink-600/10 dark:hover:bg-pink-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 dark:focus:ring-pink-500 cursor-pointer'
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-neutral-600 dark:text-neutral-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <TodoSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                todo={todo}
                onUpdate={onUpdate}
            />
        </>
    )
}

export default TodoCard