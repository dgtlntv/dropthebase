export default function ControlGroup({ label, children }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
            }}
        >
            <label>{label}</label>
            {children}
        </div>
    )
}
