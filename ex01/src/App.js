import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import './App.css'

// const greeterAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const greeterAddress = '0xa22949D1751320E1E0B8815E84cB6238489d0ed6'

function App() {
	const [greeter, setGreeter] = useState('')
	const [greeterValue, setGreeterValue] = useState('')

	useEffect(async () => {
		await requestAccounts()
		await fetchGreeter()
	})

	async function fetchGreeter() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
			try {
				const data = await contract.greet()
				setGreeter(data)
			} catch (error) {
				console.error(error)
			}
		}
	}

	async function updateGreeter(e) {
		e.preventDefault()
		console.log('updateGreeter: ', greeterValue)

		if (!greeterValue) return
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = await provider.getSigner()
			const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
			const transaction = await contract.setGreeting(greeterValue)
			try {
				await transaction.wait()
				await fetchGreeter()
				setGreeterValue('')
			} catch (error) {
				console.error(error)
			}
		}
	}

	async function requestAccounts() {
		const a = await window.ethereum.request({ method: 'eth_requestAccounts' })
		console.log('requestAccounts: ', a)
	}

	return (
		<div className="App">
			<button onClick={requestAccounts}>Request accounts</button>
			<hr />
			<button onClick={fetchGreeter}>Fetch Greeter</button>
			<hr />
			<p>{greeter}</p>
			<form onSubmit={updateGreeter}>
				<input type="text" onChange={(e) => setGreeterValue(e.target.value)} value={greeterValue} />
				<button type="submit">Update Greeter</button>
			</form>
		</div>
	)
}

export default App
