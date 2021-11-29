import Logo from '../general-electric.svg';
import { NavLink } from 'react-router-dom';
function SideBar({ user }){
    return(
        <div className={'fixed top-0 ml-0 min-h-full flex '+(user ?'visible':'hidden')}>
            <div className='bg-blue-900 text-xl text-white max-w-68 shadow-2xl min-w-62'>
                <div className='w-full relative mt-0 bg-gradient-to-l from-green-500 to-blue-600'>
                    <NavLink to='/'>
                    <img src={Logo} className='rounded-3xl w-28 p-4 my-3 mx-5' />
                    </NavLink>
                </div>
                <nav >
                <ul className='text-2xl'>
                    <li className='navitem '>
                        <NavLink to='/insights'>Global Insights</NavLink>
                    </li>
                    <li className='navitem'>
                        <NavLink to='/devices'>Devices</NavLink>
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