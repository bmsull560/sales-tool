import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Companies</span>
        </Link>
        <h1 className="text-3xl font-bold mt-4">Add New Company</h1>
        <p className="text-slate-500 mt-1">
          Create a new company profile and industry analysis
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Corporation"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-medium text-slate-700">
                Website
              </label>
              <input
                type="url"
                id="website"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="headquarters" className="block text-sm font-medium text-slate-700">
                Headquarters
              </label>
              <input
                type="text"
                id="headquarters"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="industry" className="block text-sm font-medium text-slate-700">
                Industry
              </label>
              <select
                id="industry"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="size" className="block text-sm font-medium text-slate-700">
                Company Size
              </label>
              <select
                id="size"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001-5000">1001-5000 employees</option>
                <option value="5001+">5001+ employees</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="revenue" className="block text-sm font-medium text-slate-700">
                Annual Revenue
              </label>
              <input
                type="text"
                id="revenue"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="$10M - $50M"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="funding" className="block text-sm font-medium text-slate-700">
                Funding
              </label>
              <input
                type="text"
                id="funding"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Series B, $25M"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="stage" className="block text-sm font-medium text-slate-700">
                Company Stage
              </label>
              <select
                id="stage"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select company stage</option>
                <option value="startup">Startup</option>
                <option value="growth">Growth</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Industry Context</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="trends" className="block text-sm font-medium text-slate-700">
                  Industry Trends
                </label>
                <textarea
                  id="trends"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Key trends affecting this industry..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="pressures" className="block text-sm font-medium text-slate-700">
                  Industry Pressures
                </label>
                <textarea
                  id="pressures"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pressures and challenges in this industry..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="compliance" className="block text-sm font-medium text-slate-700">
                  Compliance Requirements
                </label>
                <textarea
                  id="compliance"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Regulatory and compliance considerations..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="disruption" className="block text-sm font-medium text-slate-700">
                  Disruption Factors
                </label>
                <textarea
                  id="disruption"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Disruptive forces in this industry..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/companies"
              className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
