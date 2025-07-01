export function AboutHeader() {
  return (
    <div>
      <h2 className='text-5xl font-bold mb-8 text-center text-blue-400'>About Me</h2>
      <div className='flex flex-col text-center items-center gap-6'>
        <p className='text-lg md:text-xl font-light leading-relaxed'>
          I'm a <strong className='text-blue-400'>Software Developer</strong> at SigParser with experience building enterprise SaaS platforms serving 1,000+ users. I graduated{" "}
          <strong className='text-blue-400'>Magna Cum Laude</strong> from Cal State San Marcos with a B.S. in Software Engineering.
        </p>
        <p className='text-lg md:text-xl font-light leading-relaxed'>
          I specialize in full-stack development, machine learning optimization, and cloud infrastructure, with expertise in React.js, ASP.NET, Python, AWS, and modern DevOps
          practices.
        </p>
      </div>
    </div>
  );
}
