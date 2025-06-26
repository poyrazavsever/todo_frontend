import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Form submission logic will be added here
        console.log(formData)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className="font-nunito min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-6xl flex items-center justify-between gap-5 sm:gap-36">
                <motion.div
                    className="flex-1"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-4xl font-bold text-pink-600 mb-2"
                        variants={itemVariants}
                    >
                        Tekrar Hoşgeldin
                    </motion.h2>
                    <motion.p
                        className="text-neutral-500 mb-8"
                        variants={itemVariants}
                    >
                        Hesabına giriş yap ve planlamaya devam et!
                    </motion.p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <motion.div variants={itemVariants}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                placeholder="Email adresi"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                placeholder="Şifre"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform cursor-pointer"
                            >
                                Giriş Yap
                            </button>
                        </motion.div>
                    </form>

                    <motion.p
                        className="mt-6 pl-2 text-neutral-500"
                        variants={itemVariants}
                    >
                        Hesabın yok mu?{' '}
                        <Link href="/register" className="text-pink-600 hover:text-pink-700 font-medium">
                            Kayıt Ol
                        </Link>
                    </motion.p>
                </motion.div>

                <motion.div
                    className="hidden lg:block flex-1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        src="/auth.jpg"
                        alt="Login illustration"
                        width={600}
                        height={600}
                        className="rounded-2xl"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Login
