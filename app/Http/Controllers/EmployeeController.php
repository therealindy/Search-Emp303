<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

//หน้านี้มีหน้าที่เป็นตัวควบคุม (Controller) ใน Laravel สำหรับจัดการกับข้อมูลพนักงาน (Employee)

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search', ''); // รับค่าค้นหาจากคำขอ (request) ถ้าไม่มีจะใช้ค่าว่าง จะหาข้อความได้ทั้งชื่อหรือนามสกุล
        $employees =DB::table('employees')      // ค้นหาพนักงานจากฐานข้อมูลที่มีชื่อหรือนามสกุลตรงกับคำค้นหา
        ->where('first_name','like','%' . $query . '%')
        ->orWhere('last_name','like','%' . $query . '%')
        ->paginate(15);

        //Log::info($employees);

        return Inertia::render('Employee/Index',[ // ส่งข้อมูลพนักงานไปยังหน้า Employee/Index โดยใช้ Inertia
            'employees' => $employees,
            'query' => $query,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
