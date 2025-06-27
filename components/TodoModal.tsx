import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Add submission logic
        console.log(formData)
        onClose()
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
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default TodoModal