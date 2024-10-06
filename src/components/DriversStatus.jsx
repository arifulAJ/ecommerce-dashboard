// eslint-disable-next-line react/prop-types
const DriversStatus = ({text,price,icon}) => {
    return (
        <div className='w-full flex items-center rounded-xl justify-between  px-5 py-8 bg-[#1E66CA] text-white'>
            <div className=''>
               <p className='text-xl font-medium'>{text}</p>
               <p className='font-medium'>{price}</p>
            </div>
            {icon}
        </div>
    );
}

export default DriversStatus;
