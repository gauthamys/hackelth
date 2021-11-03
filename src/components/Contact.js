function Card(){
    return(
        <div></div>
    )
}
function Contact(){
    return(
        <div className='relative ml-60 p-4 pt-6'>
            <div class="h-screen">
                <span class="bg-clip-text text-7xl text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Contact
                </span>
                <p className='p-4 mt-0 pt-0 ml-32 text-gray-500'> Meet the team </p>
                <div className='flex'>
                    <section className='namecard'>
                        <p className='text-2xl p-5'>Chakita</p>
                    </section>
                    <div className='namecard'>
                        <p className='text-2xl p-5'>Saileshwar</p>
                    </div>
                    <div className='namecard'>
                        <p className='text-2xl p-5'>Parimala</p>
                    </div>
                    <div className='namecard'>
                        <p className='text-2xl p-5'>Gautham</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;