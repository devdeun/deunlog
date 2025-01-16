interface Props {
  title?: string
}

const Envelopment = ({ title = '' }: Props) => {
  return (
    <div className="group/envelopment relative flex aspect-[200/283] cursor-pointer">
      <svg
        className="h-full w-full"
        viewBox="0 0 200 283"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 24C0.5 11.0213 11.0213 0.5 24 0.5H176C188.979 0.5 199.5 11.0213 199.5 24V35.3209H0.5V24Z"
          fill="#F2F2F2"
          stroke="#616161"
        />
        <path
          d="M12.5 45.5H186.624V278.331H12.5V45.5Z"
          fill="#FAFAFA"
          stroke="#2A2A2A"
          className="transition-transform duration-300 group-hover/envelopment:-translate-y-7"
        />
        <mask id="path-3-inside-1_466_196" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M200 34.8259H0V282.587H56V282C56 275.373 61.3726 270 68 270H133C139.627 270 145 275.373 145 282V282.587H200V34.8259Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M200 34.8259H0V282.587H56V282C56 275.373 61.3726 270 68 270H133C139.627 270 145 275.373 145 282V282.587H200V34.8259Z"
          fill="#F2F2F2"
        />
        <path
          d="M0 34.8259V33.8259H-1V34.8259H0ZM200 34.8259H201V33.8259H200V34.8259ZM0 282.587H-1V283.587H0V282.587ZM56 282.587V283.587H57V282.587H56ZM145 282.587H144V283.587H145V282.587ZM200 282.587V283.587H201V282.587H200ZM0 35.8259H200V33.8259H0V35.8259ZM1 282.587V34.8259H-1V282.587H1ZM56 281.587H0V283.587H56V281.587ZM57 282.587V282H55V282.587H57ZM57 282C57 275.925 61.9249 271 68 271V269C60.8203 269 55 274.82 55 282H57ZM68 271H133V269H68V271ZM133 271C139.075 271 144 275.925 144 282H146C146 274.82 140.18 269 133 269V271ZM144 282V282.587H146V282H144ZM200 281.587H145V283.587H200V281.587ZM199 34.8259V282.587H201V34.8259H199Z"
          fill="#616161"
          mask="url(#path-3-inside-1_466_196)"
        />
        <rect x="135.824" y="51.2463" width="47.7562" height="47.7562" stroke="#616161" />
        <line
          y1="-0.5"
          x2="49.7512"
          y2="-0.5"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 177.469 57.7114)"
          stroke="#616161"
        />
        <line x1="16" y1="75.5" x2="96" y2="75.5" stroke="#616161" />
        <line x1="16" y1="93.5" x2="96" y2="93.5" stroke="#616161" />
      </svg>

      <h2 className="absolute inset-0 mt-10 flex items-center justify-center text-center text-gray-900 underline">
        {title}
      </h2>
    </div>
  )
}

export default Envelopment
