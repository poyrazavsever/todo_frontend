import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    })

    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const token = localStorage.getItem('token')
        let userId

        try {
            if (!token) {
                throw new Error('Kullanıcı oturumu bulunamadı')
            }

            const user = localStorage.getItem('user')
            if (!user) {
                throw new Error('Kullanıcı bilgileri bulunamadı')
            }

            const decodedToken = jwtDecode<{ userId: string }>(token)
            userId = decodedToken.userId

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir hata oluştu')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/todo', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    category: formData.category,
                    userId: userId
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Todonu Ekleyemedim...')
            }

            toast.success('Todo başarıyla eklendi!')

            onClose()

            setFormData({
                title: '',
                content: '',
                category: ''
            })

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir hata oluştu')
        }
    }

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as "spring",
                duration: 0.5,
                bounce: 0.3
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: {
                duration: 0.3
            }
        }
    }

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl w-full max-w-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
                                    Yeni Todo
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-600 dark:text-neutral-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Başlık
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-500/20 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        İçerik
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-500/20 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-colors resize-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Kategori
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-500/20 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-colors"
                                        required
                                    />
                                </div>

                                <div className="pt-4 flex justify-end space-x-3 border-t border-neutral-200 dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-pink-600 dark:bg-pink-500 hover:bg-pink-700 dark:hover:bg-pink-600 rounded-md transition-colors"
                                    >
                                        Oluştur
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TodoModal