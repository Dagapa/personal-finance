export const Header = () => {
	return (
		<header className='flex justify-between items-center p-4 w-full h-14 rounded-md shadow-2xs'>
			<div>
				<h2>Header</h2>
			</div>
			<nav className="flex justify-center items-center w-full h-full">
				<ul className="flex justify-center items-center gap-4">
					<li className="cursor-pointer text-sm">Home</li>
					<li className="cursor-pointer text-sm">Transactions</li>
					<li className="cursor-pointer text-sm">Accounts</li>
					<li className="cursor-pointer text-sm">budget</li>
				</ul>
			</nav>
			<div>
				<button type="button">User</button>
			</div>
		</header>
	);
};
