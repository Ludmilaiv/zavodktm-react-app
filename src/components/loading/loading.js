import { Oval } from  'react-loader-spinner'

const Loading = () => {

  return <div className="content__page"><Oval
    height={100}
    width={100}
    color="#ff8000"
    wrapperStyle={{margin: '20px', height: '50px'}}
    wrapperClass=""
    visible={true}
    ariaLabel='loading'
    secondaryColor="#FFC400"
    strokeWidth={5}
    strokeWidthSecondary={5}
  /></div>

}

export default Loading;
