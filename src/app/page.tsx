import {HomeForm} from './components/HomeForm'

export default function Home() {
    return (
        <main className="min-h-screen p-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-4xl font-bold mb-8">Hello World</h1>
                <HomeForm/>
            </div>
        </main>
    )
}