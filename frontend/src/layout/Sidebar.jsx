import React from "react";
import useSidebar from "./hooks/useSidebar";

const Sidebar = () => {
	const { menu, handleNavigation, location } = useSidebar();

	return (
		<aside className="w-48 bg-white fixed top-0 left-0 h-full border-r border-gray-200 z-10">
			<h1 className="flex items-center justify-center h-16 text-xl font-bold text-center">
				Voice PoP
			</h1>
			<ul className="menu">
				{menu.map((item) => (
					item.children === undefined ? (
						<li key={item.code}>
							<button onClick={() => handleNavigation(item.url, item.type)}>
								{item.name}
							</button>
						</li>
					) : (
						<li key={item.code}>
							<h2 className="menu-title">{item.name}</h2>
							<ul>
								{item.children.map((child) => (
									<li key={child.code}>
										<button
											onClick={() => handleNavigation(child.url, child.type)}
											className={
												location.pathname === child.url
													? "bg-primary rounded-md text-white font-semibold"
													: ""
											}
										>
											{child.name}
										</button>
									</li>
								))}
							</ul>
						</li>
					)
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;