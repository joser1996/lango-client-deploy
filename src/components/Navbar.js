import React from 'react'
import Logo from '../assets/L.png';

export const Navbar = () => {

  return (
	<div className='ui fixed inverted menu'>
		<div className='ui container'>
			{/*Left Logo*/}
			<div className='item'>
				<img  className='logo' src={Logo} />
			</div>
			<div className='item'>
				<h1>Lango!</h1>
			</div>

			<div className='right menu'>
				<div className='item'>
					<div className='ui large purple horizontal label'>Deck: Name</div>
				</div>

				<div className='ui simple dropdown item'>
					Decks
					<i className='dropdown icon'></i>
					<div className='menu'>
						<div className='item'>Deck 1</div>
						<div className='item'>This is a long name</div>
					</div>
				</div>
				<a className='ui item'>Study</a>
				<a className='ui item'>Logout</a>
			</div>
		</div>
	</div>
  )
}

export default Navbar