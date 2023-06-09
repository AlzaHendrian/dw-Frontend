import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { ModalContext } from "../../Context/ModalContext"
import useFetch from "../../Config/useFetch"
import { useMutation } from "react-query"

import Swal from 'sweetalert2';
import { API } from "../../Config/Api"

const DeleteEpisode = (props) => {
    const {id} = useParams()
   
    const [_, modalDispatch] = useContext(ModalContext)
    const [dataEpisode, setDataEpisode] = useState([])
    const [form, setForm] = useState({
        image: '',
        title: '',
        link: '',
        year: '',
        film_id: '',
    });

    const fetchEpisode = async () => {
        const response = await API.get(`/film/${id}/episode`)
        setDataEpisode(response.data.data)
    }

    console.log("penis", dataEpisode)
    useEffect(() => {
        fetchEpisode()
        console.log("kontol 2")
    }, [])

    const deleteHandle = useMutation((id) => {
        try {
            Swal.fire ({
                title: 'Are your sure ?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'yes, delete it!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'You file has been Deleted.',
                        'success'
                    )
                    await API.delete(`/episode/${id}`)
                    fetchEpisode();
                }
            })
        }catch(err) {
            console.log("memek", err)
        }
    })

    return (
        <div className="absolute text-white w-full h-full bg-zinc-900 z-10 top-20 flex justify-center backdrop-blur-none bg-opacity-80">
            <div className="flex justify-center flex-col px-10 fixed top-50 rounded-2xl bg-black h-2/5 w-2/5">
                <div className="flex justify-evenly">
                    <h2 className="font-semibold mb-5 text-2xl text-white">Edit Episode</h2>
                    <button onClick={() => modalDispatch({type: 'CLOSE_AUTH_MODAL'})} className="text-4xl absolute top-5 right-16 text-red-700 font-bold">x</button>
                </div>
                <div className="overflow-hidden px-20">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tr className="flex gap-10">
                            <th className="w-1/2">
                                List Episode
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                        {dataEpisode?.map((data, i) => (
                            <tr key={i} className="flex gap-10">
                                <td className="w-1/2 text-white">{data.title}</td>
                                <td className="text-red-600"><button onClick={() => deleteHandle.mutate(data.id)}>DELETE</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DeleteEpisode