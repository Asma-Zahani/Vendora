/* eslint-disable react/prop-types */
const Checkbox = ({ checked, onChange }) => {
    return (
        <label className="flex cursor-pointer items-center">
            <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
            <span className={`w-4 h-4 flex items-center justify-center rounded-sm border transition-all
                    ${checked ? 'bg-purpleLight border-transparent' : 'dark:bg-contentDark border dark:border-borderDark'}`}>
                {checked && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true" >
                        <path d="M6 10l3 3 6-6" />
                    </svg>
                )}
            </span>
        </label>
    );
};

export default Checkbox;
