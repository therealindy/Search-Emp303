import { router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || ''); // สร้าง state สำหรับเก็บค่าค้นหา

    // ฟังก์ชันสำหรับจัดการการค้นหา
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employee', { search });        // ส่งคำขอค้นหาไปยังเส้นทาง /employee
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Employee
                    </h2>
                }
            >
                <div>
                    {/* ฟอร์มสำหรับการค้นหา */}
                    <form onSubmit={handleSearch} className="px-8 mx-auto max-w-7xl sm:px-6 py-2 ">
                        <div className="flex justify-center w-full max-w-2xl mx-auto py-5">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full max-w-lg rounded-xs bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mr-4"
                            />
                            <button
                                type="submit"
                                className="block rounded-xl bg-indigo-600 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-indigo-600"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="px-8 mx-auto max-w-7xl sm:px-6 py-2">
                        {/* ตารางแสดงข้อมูลพนักงาน */}
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr className="px-6 py-3 text-center text-lg font-semibold text-gray-800 uppercase tracking-wider">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Birth</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* แสดงข้อมูลพนักงานแต่ละคน */}
                                {employees.data.map((employee) => (
                                    <tr key={employee.emp_no} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-700">{employee.emp_no}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-700">{employee.first_name}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-700">{employee.last_name}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-700">{employee.birth_date}</td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-700">{employee.gender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* ปุ่มสำหรับเปลี่ยนหน้า */}
                        <div className="flex justify-center w-full max-w-2xl mx-auto py-5 space-x-12">
                            <button
                                onClick={() =>
                                    employees.prev_page_url &&
                                    window.location.assign(employees.prev_page_url)
                                }
                                disabled={!employees.prev_page_url}
                                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() =>
                                    employees.next_page_url &&
                                    window.location.assign(employees.next_page_url)
                                }
                                disabled={!employees.next_page_url}
                                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </AuthenticatedLayout>
        </>
    );
}
