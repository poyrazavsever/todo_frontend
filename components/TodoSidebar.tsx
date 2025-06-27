import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import toast from 'react-hot-toast'
import classNames from 'classnames'

interface TodoSidebarProps {
    isOpen: boolean
    onClose: () => void
    todo?: {
        _id: string
        title: string
        content: string
        category: string
        completed: boolean
    }
    onUpdate: () => void
}

const TodoSidebar: React.FC<TodoSidebarProps> = ({ isOpen, onClose, todo, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: todo?.title || '',
        content: todo?.content || '',
        category: todo?.category || ''
    })

    const [completed, setCompleted] = useState(todo?.completed || false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const sidebarVariants: Variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { x: 20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/todo/${todo?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Todo güncellenemedi')
            }

            toast.success('Todo güncellendi!')
            onUpdate?.()
            onClose()
        } catch (error) {
            console.error('Update error:', error)
            toast.error('Todo güncellenirken bir hata oluştu')
        }
    }

    const handleComplete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/todo/${todo?._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Todo tamamlanamadı')
            }

            toast.success('Todo tamamlandı!')
            setCompleted(!completed)
            onUpdate?.()
            onClose()
        } catch (error) {
            console.error('Complete error:', error)
            toast.error('Todo tamamlanırken bir hata oluştu')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Bu todoyu silmek istediğinize emin misiniz?')) {
            return
        }

        try {
            const response = await fetch(`http://localhost:3000/api/todo/${todo?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Todo silinemedi')
            }

            toast.success('Todo silindi!')
            onUpdate?.()
            onClose()
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Todo silinirken bir hata oluştu')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-pink-950/30 dark:bg-pink-950/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-lg z-50 p-8 overflow-y-auto"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="font-nunito space-y-6">
                            <motion.h2
                                className="text-3xl font-bold text-pink-600 dark:text-pink-500"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                Todo Detayları
                            </motion.h2>

                            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Başlık"
                                    className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="İçerik"
                                    rows={4}
                                    className="appearance-none rounded-2xl relative block w-full px-6 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all resize-none"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                                <input
                                    type="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="Kategori"
                                    className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all"
                                />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex gap-3 pt-4"
                            >
                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 py-2 px-4 rounded-full bg-pink-600 dark:bg-pink-500 text-white hover:bg-pink-700 dark:hover:bg-pink-600 transition-all transform hover:scale-105"
                                >
                                    Düzenle
                                </button>
                                <button
                                    onClick={handleComplete}
                                    className={classNames(
                                        'flex-1 py-2 px-4 rounded-full transition-all transform',
                                        {
                                            'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600': !completed,
                                            'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600': completed,
                                        }
                                    )}
                                >
                                    {completed ? 'Geri Al' : 'Tamamla'}
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-2 px-4 rounded-full bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 transition-all transform hover:scale-105"
                                >
                                    Sil
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TodoSidebar