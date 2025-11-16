const loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#000',
                backgroundColor: '#fff',
                padding: '20px',
                border: '5px solid #000',
                boxShadow: '10px 10px 0px #000',
                textAlign: 'center'
            }}>
                LOADING...
            </div>
        </div>
    )
}
export default loading