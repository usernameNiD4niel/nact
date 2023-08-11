import logo from "./assets/logo.svg";
import Header from "./dashboard/Header";

function App() {
	return (
		<>
			<Header />
			<main className="grid grid-cols-[20%_1fr] h-screen">
				<aside className="bg-primary hidden flex-col items-center py-5">
					<a href="/">
						<img
							className="mask mask-hexagon bg-white w-10 md:w-24 p-5"
							src={logo}
						/>
					</a>
				</aside>
				<div>dasdasdas</div>
			</main>
		</>
	);
}

export default App;
