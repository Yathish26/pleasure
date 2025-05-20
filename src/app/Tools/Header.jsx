export default function Header() {
    return (
        <header className="mb-10 text-center">
            <div className='flex items-center justify-center'>
                <img className='w-12 h-12' src="/tulip.png" alt="Celebpaps" />
                <h1 className="text-5xl font-bold text-pink-600 drop-shadow-sm">Celebpaps</h1>
            </div>
            <p className="mt-2 text-blue-600 text-lg">Upload and view your images with style!</p>
        </header>
    )
}
