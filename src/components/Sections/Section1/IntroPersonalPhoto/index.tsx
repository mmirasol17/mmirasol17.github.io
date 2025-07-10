export function IntroPersonalPhoto() {
  return (
    <div className='mt-28 mb-4 flex justify-center items-center'>
      <div className='sm:max-w-sm w-40 h-40 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
        <div className='text-6xl'>
          <img
            alt='Marin Mirasol'
            src='./images/MarinMirasol.jpg'
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
}
