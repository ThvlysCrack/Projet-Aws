function Background({ image, children }) {
    return (
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: '100% 100%', width: '100%', height: '100%',margin: 'auto',
      overflowx: 'hidden', overflowy: 'hidden', backgroundRepeat: 'no-repeat' }}>
        {children}
      </div>
    );
  }
  export default Background;