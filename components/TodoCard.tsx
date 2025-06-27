import React from 'react'

const TodoCard = () => {
  return (
    <div className='flex flex-col gap-2 py-4 px-6 rounded-md border border-pink-600 bg-pink-500/5 w-sm'>
        <h2 className="text-xl font-bold text-neutral-700">Todo Title</h2>
        <p className="text-neutral-500 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minima, quos eligendi dicta ratione possimus obcaecati magnam inventore neque animi, facilis impedit! Ullam aut dolore debitis veritatis praesentium sit. Soluta nihil, tempora amet rerum modi, quam veniam voluptas itaque neque similique molestias doloribus explicabo reiciendis quo ad officiis! Voluptatem, sit.</p>
        <div className='flex items-center justify-between mt-2'>
              <span className='text-sm py-1 px-2 rounded-full bg-pink-600 text-white'>Category</span>
              <button className='p-2 rounded-full hover:bg-pink-600/10 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path className='fill-pink-600' d="M21 11V3h-8v2h4v2h-2v2h-2v2h-2v2H9v2h2v-2h2v-2h2V9h2V7h2v4zM11 5H3v16h16v-8h-2v6H5V7h6z" /></svg>
            </button>
        </div>
    </div>
  )
}

export default TodoCard