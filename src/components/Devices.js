function Device(){
    return(
        <div className='heading'>
            <div class="text-7xl">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Devices
                </span>
                <div className="text-3xl h-screen mt-4">
                    <div class="text-2xl container py-5 mx-auto flex flex-wrap items-center justify-between">
                        <div class="border-4 border-blue-200 rounded-full bg-white shadow flex w-4/5">
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="rounded-tl-full rounded-bl-full py-2 px-4 w-screen" />
                            <button class="relative bg-green-300 rounded-tr-full rounded-bl-full rounded-tl-full rounded-br-full transition duration-300 hover:bg-red-300 hover:text-white py-2 px-4 mr-0 w-80">
                                <p class="font-semibold text-base uppercase">🔍 search</p>
                            </button>
                        </div>
                    </div>
                    <table class="table-fixed w-11/12 text-2xl border-blue-200">
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