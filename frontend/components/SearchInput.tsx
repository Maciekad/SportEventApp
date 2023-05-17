interface SearchInputProps {
    onSearchTextChanged: (text: string) => void
}

const SearchInput = (props: SearchInputProps) => {

    const onSearchTextChanged = (text: string) => {
        
        props.onSearchTextChanged(text);
    }

    return (
        <form>
            <label className="mb-2 text-sm font-medium sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                    type="search"
                    id="default-search"
                    className="block appearance-none border border-gray-300 rounded w-full p-2 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Search..."
                    onChange={(event) => onSearchTextChanged(event.target.value)}/>
            </div>
        </form>
    )
}

export default SearchInput;