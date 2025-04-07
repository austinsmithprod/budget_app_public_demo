
type ToolbarButtonProps = {
    label: string,
    onClick?: () => void,
    styleString?: string
}

export default function ToolbarButton({ label, onClick, styleString }: ToolbarButtonProps) {

    return (
        <div>
            <button
                onClick={onClick}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${styleString}`}>
                {label}
            </button>
        </div>
    );
}