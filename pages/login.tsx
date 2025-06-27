import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Giriş yapılamadı')
            }

            // Token ve kullanıcı bilgilerini kaydet
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            toast.success('Başarıyla giriş yapıldı!')
            router.push('/')

        } catch (error) {
            console.error('Login error:', error)
            toast.error(error instanceof Error ? error.message : 'Giriş yaparken bir hata oluştu')
        } finally {
            setIsLoading(false)
        }
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
        <div className="font-nunito min-h-screen bg-gradient-to-br from-pink-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl flex items-center justify-between gap-5 sm:gap-36">
                <motion.div
                    className="flex-1"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-4xl font-bold text-pink-600 dark:text-pink-500 mb-2"
                        variants={itemVariants}
                    >
                        Tekrar Hoşgeldin
                    </motion.h2>
                    <motion.p
                        className="text-neutral-500 dark:text-neutral-400 mb-8"
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
                                className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all disabled:opacity-50"
                                placeholder="Email adresi"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-full relative block w-full px-6 py-3 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent transition-all disabled:opacity-50"
                                placeholder="Şifre"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-full text-white bg-pink-600 dark:bg-pink-500 hover:bg-pink-700 dark:hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                            </button>
                        </motion.div>
                    </form>

                    <motion.p
                        className="mt-6 pl-2 text-neutral-500 dark:text-neutral-400"
                        variants={itemVariants}
                    >
                        Hesabın yok mu?{' '}
                        <Link href="/register" className="text-pink-600 dark:text-pink-500 hover:text-pink-700 dark:hover:text-pink-400 font-medium">
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
