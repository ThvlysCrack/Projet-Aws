function Background({ image, children }) {
    return (
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', width: '100%', height: '100vh',margin: '0',
      overflow:'hidden', backgroundRepeat: 'no-repeat' }}>
        {children}
      </div>
    );
  }
  export default Background;