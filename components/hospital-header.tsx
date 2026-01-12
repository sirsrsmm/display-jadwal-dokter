interface HospitalHeaderProps {
  currentDate: string
  currentTime: string
}

export default function HospitalHeader({ currentDate, currentTime }: HospitalHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-white to-accent sticky top-0 z-50 shadow-lg">
      <div className="w-full px-2 sm:px-3 lg:px-4 py-3 sm:py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex-shrink-0 h-12 sm:h-14 lg:h-16 flex items-center">
              <img
                src="https://rsmmbogor.com/cfind/source/images/logo-rs-kemenkes.png"
                alt="RSJ Marzoeki Mahdi Bogor"
                className="h-full object-contain"
              />
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-xs sm:text-sm text-primary-foreground/80 mb-1 hidden sm:block">{currentDate}</div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm sm:text-base lg:text-lg font-mono text-primary-foreground font-bold">
                {currentTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
