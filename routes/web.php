<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//หน้าที่คือการเรียกใช้ข้อมูลจากEmployeeController

// เส้นทางเพื่อแสดงหน้า Employee index โดยใช้ Inertia
Route::get('/employee', function() {
    return Inertia::render('Employee/Index');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


//สร้างmiddlewareให้products เพื่อให้ไปเช็คว่าเข้าสู่ระบบแล้วหรือยัง ถ้าเข้าสู่ระบบแล้วจะสามารถดูได้ ถ้าไม่จะนำไปสู่หน้ารายการไม่ได้
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index'); //เส้นทางเพื่อแสดงรายการพนักงาน จัดการโดย EmployeeController จะเปลี่ยนชื่อให้ใช้งานง่ายขึ้น
});

require __DIR__.'/auth.php';
