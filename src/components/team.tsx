import React from "react";
import MemberWheel, { type Member } from "./team/MemberWheel";
import AdvisorsSection, { type Advisor } from "./team/AdvisorsSection";
import AlumniSection, { type AlumniYear } from "./team/AlumniSection";
import TeamFooter from "./team/TeamFooter";

// ── Data ────────────────────────────────────────────────────────────────

const MEMBERS: Member[] = [
    {
        name: "First Last",
        role: "Role",
        bio: "Information ayyayyayyayyay aicgh adlghadlg|cadlc| ado adlp padq g ad padq |cqadel| gp| ada adlp padq g ad padq g ad padq |cqadel| gp| ado adlp padq g ad padq djadql| gp| ad| adlp padq g ad padq djadql| gp| and adlp padq g ad padq |cqadel| gp| ado adlp padq g ad padq djadql| gp| ada adlp padq g ad padq |cqadel| gp| ado adlp padq g ad padq djadql| gp| ada adlp padq g ad padq djadql| gp| ado adlp padq| g ad padq djadql| gp| ado padq| g",
        image: "",
    },
    { name: "Member 2", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 3", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 4", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 5", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 6", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 7", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 8", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 9", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 10", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 11", role: "Role", bio: "Bio placeholder text.", image: "" },
    { name: "Member 12", role: "Role", bio: "Bio placeholder text.", image: "" },
];

const ADVISORS: Advisor[] = [
    { name: "Kate Sharer", description: "description blah", image: "" },
    { name: "Catherine O'Haver", description: "description blah", image: "" },
    {
        name: "Jes O'Ke",
        description: "description b...",
        initial: "J",
        color: "#6366f1",
    },
];

const ALUMNI: AlumniYear[] = [
    {
        year: "2025",
        names: [
            "Avani Karthik",
            "Sean Lee",
            "Aiden Lee",
            "Amy Jing",
            "Aria Im",
            "Arjun Gulati",
            "Claire Lee",
            "Harsha Poorepalle",
            "Jeremy Chen",
            "Jiwoo Han",
            "Julia Rho",
            "Keerthana Anumukonda",
            "Nishchal Chawla",
            "Reva Basharath",
            "Rohan Kaushik",
            "Sahana Tatavarthi",
            "Sanikalo Yeleti",
            "Shashvat Balmurai",
            "Veda Vudithyala",
            "Vedant Kelpatrapu",
        ],
    },
];

// ── Page Component ──────────────────────────────────────────────────────

export default function Team() {
    return (
        <div className="min-h-screen text-white">
            {/* Hero */}
            <section className="flex flex-col items-center pt-16 pb-8">
                <h1 className="text-5xl lg:text-6xl font-bold [text-shadow:0_0_0.5em_#FFFFFF]">
                    Team
                </h1>
                <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
                    Lambert High School
                </p>
            </section>

            <MemberWheel members={MEMBERS} />
            <AdvisorsSection advisors={ADVISORS} />
            <AlumniSection alumni={ALUMNI} />
            <TeamFooter />
        </div>
    );
}
