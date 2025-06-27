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
                    <motion.div
                        className="fixed inset-0 bg-pink-950/30 z-40"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 z-50"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-3xl font-bold text-pink-600 mb-6">
                            Yeni Todo Ekle
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Başlık"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    name="content"
                                    placeholder="İçerik"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="appearance-none rounded-2xl relative block w-full px-6 py-3 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all min-h-[120px]"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Kategori"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 px-6 border border-pink-600 text-pink-600 font-medium rounded-full hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-6 border border-transparent font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
                                >
                                    Kaydet
                                </button>
                            </div>
                            {error && (
                                <p className="mt-4 text-pink-500 text-sm text-center">{error}</p>
                            )}
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TodoModal