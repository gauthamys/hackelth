import Logo from '../general-electric.svg';
import { NavLink } from 'react-router-dom';
function SideBar(){
    return(
        <div className='fixed ml-0 min-h-full flex'>
            <div className='bg-blue-900 saturate-50  text-xl text-white max-w-68 shadow-2xl min-w-62'>
                <div className='w-full relative mt-0 bg-gradient-to-l from-green-500 to-blue-600'>
                    <img src={Logo} href='/' className='rounded-3xl w-28 p-4 my-3 mx-5
                        transition duration-500 ease-in-out transform hover:-translate-y-1 hover:translate-x-1 hover:scale-125' />
                </div>
                <nav >
                <ul className='text-2xl'>
                    <li className='navitem'>
                        <NavLink to='/'>Global Insights</NavLink>
                    </li>
                    <li className='navitem'>
                        <NavLink to='/devices'>Devices</NavLink>
                    </li>
                    <li className='navitem'>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                    <li className='navitem'>
                        <NavLink to='/contact'>Contact</NavLink>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    );
}
export default SideBar;