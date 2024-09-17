import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const query = "SELECT * FROM users ORDER BY user_id ASC";
        const result = await pool.query(query);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        return new NextResponse("Error fetching users", { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await request.json();
        const query = `
      INSERT INTO users (username, ap_pat, ap_mat, age, email, gender)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
        const values = [user.username, user.ap_pat, user.ap_mat, user.age, user.email, user.gender];
        const result = await pool.query(query, values);

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse("Error creating user", { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const user = await request.json();
        const query = `
      UPDATE users
      SET username = COALESCE(NULLIF($1, username), username),
          ap_pat = COALESCE(NULLIF($2, ap_pat), ap_pat),
          ap_mat = COALESCE(NULLIF($3, ap_mat), ap_mat),
          age = COALESCE(NULLIF($4, age), age),
          email = COALESCE(NULLIF($5, email), email),
          gender = COALESCE(NULLIF($6, gender), gender)
      WHERE user_id = $7
      RETURNING *;
    `;
        const values = [user.username, user.ap_pat, user.ap_mat, user.age, user.email, user.gender, user.user_id];
        const result = await pool.query(query, values);

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse("Error updating user", { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("user_id");

        if (!userId) {
            return new NextResponse("User ID is required", { status: 400 });
        }

        const query = `
      DELETE FROM users
      WHERE user_id = $1
      RETURNING *;
    `;
        const values = [userId];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("User deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return new NextResponse("Error deleting user", { status: 500 });
    }
}
