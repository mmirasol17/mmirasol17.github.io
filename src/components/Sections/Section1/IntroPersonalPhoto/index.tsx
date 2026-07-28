export function IntroPersonalPhoto() {
  return (
    <div className='mt-28 mb-4 flex justify-center items-center'>
      <div className='sm:max-w-sm w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
        <img
          alt='Marin Mirasol'
          src='./images/MarinMirasol.jpg'
          className='w-full h-full object-cover'
          width={512}
          height={512}
          loading='lazy'
        />
      </div>
    </div>
  );
}
