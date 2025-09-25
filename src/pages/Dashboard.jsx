import React from "react";
import { engagementData } from "../engagementData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = () => {
	// Calculate totals
	const totalDay = engagementData.days.reduce((sum, d) => sum + d.engagements, 0);
	const totalWeek = engagementData.weeks.reduce((sum, w) => sum + w.engagements, 0);
	const totalMonth = engagementData.months.reduce((sum, m) => sum + m.engagements, 0);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white rounded-lg shadow p-6 text-center">
					<h2 className="text-lg font-semibold mb-2">Engagements (Last 7 Days)</h2>
					<p className="text-2xl font-bold text-blue-600">{totalDay}</p>
				</div>
				<div className="bg-white rounded-lg shadow p-6 text-center">
					<h2 className="text-lg font-semibold mb-2">Engagements (Last 4 Weeks)</h2>
					<p className="text-2xl font-bold text-green-600">{totalWeek}</p>
				</div>
				<div className="bg-white rounded-lg shadow p-6 text-center">
					<h2 className="text-lg font-semibold mb-2">Engagements (Last 4 Months)</h2>
					<p className="text-2xl font-bold text-purple-600">{totalMonth}</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-xl font-semibold mb-4">Daily Engagements</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={engagementData.days}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="engagements" stroke="#8884d8" activeDot={{ r: 8 }} />
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-xl font-semibold mb-4">Weekly Engagements</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={engagementData.weeks}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="week" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="engagements" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="bg-white rounded-lg shadow p-6 mt-8">
				<h3 className="text-xl font-semibold mb-4">Monthly Engagements</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={engagementData.months}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="engagements" fill="#8884d8" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Dashboard;
