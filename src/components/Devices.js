function Device(){
    return(
        <div className='heading'>
            <div class="text-7xl">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Devices
                </span>
                <div className="text-3xl h-screen">
                    <div class="text-2xl container py-5 mx-auto flex flex-wrap items-center justify-between">
                        <div class="border-4 border-blue-500 rounded-full bg-white shadow flex w-11/12">
                            <input
                                type="text"
                                placeholder="Search Here"
                                class="w-5 rounded-tl-full rounded-bl-full py-2 px-4 w-full" />
                            <button class="bg-green-300 rounded-tr-full rounded-br-full hover:bg-red-300 py-2 px-4">
                                <p class="font-semibold text-base uppercase">Search</p>
                            </button>
                        </div>
                    </div>
                    <table class="table-fixed w-11/12 text-2xl">
                        <thead className="text-left border text-green-400">
                            <tr>
                            <th className="py-5 px-4">Device</th>
                            <th>Cost incurred</th>
                            <th>Exam Count</th>
                            <th>Health Score</th>
                            </tr>
                        </thead>  
                        <tbody>
                            <tr className="border">
                                <td className="py-5 px-4">sys101</td>
                                <td>1200</td>
                                <td>858</td>
                                <td>68</td>
                            </tr>
                            <tr className="border">
                                <td className="py-5 px-4">sys2</td>
                                <td>5678</td>
                                <td>112</td>
                                <td>45</td>
                            </tr>
                            <tr className="border">
                                <td className="py-5 px-4">sys67</td>
                                <td>5334</td>
                                <td>1,280</td>
                                <td>22</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Device;