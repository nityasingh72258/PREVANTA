import streamlit as st

# --------------------------------------------------
# PAGE CONFIG
# --------------------------------------------------

st.set_page_config(
    page_title="PREVANTA",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# --------------------------------------------------
# DEMO DATA
# --------------------------------------------------

COLLEGE_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6mO4WlFVPhoq2HCTWNWquE_9Y4ixUtAFAxVk7Jlb7lQCwZMy6d9-Bgg&s=10"

if "page" not in st.session_state:
    st.session_state.page = "Home"

if "verified" not in st.session_state:
    st.session_state.verified = False

if "complaint" not in st.session_state:
    st.session_state.complaint = None

# --------------------------------------------------
# CSS
# --------------------------------------------------

st.markdown("""
<style>

* {
    box-sizing: border-box;
}

.stApp {
    background:
        radial-gradient(circle at 15% 20%, rgba(91, 84, 190, 0.18), transparent 28%),
        radial-gradient(circle at 85% 70%, rgba(45, 80, 180, 0.16), transparent 30%),
        linear-gradient(135deg, #070a20 0%, #0c1030 45%, #080b24 100%);
    color: white;
}

.block-container {
    max-width: 1200px;
    padding-top: 1.5rem;
    padding-bottom: 3rem;
}

/* Hide Streamlit default elements */

#MainMenu {
    visibility: hidden;
}

footer {
    visibility: hidden;
}

header {
    visibility: hidden;
}

/* Navbar */

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0 28px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 50px;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0;
}

.brand img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    margin-right: 2px;
}

.brand-name {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 1.5px;
    color: white;
}

.nav-text {
    color: #b8c0e3;
    font-size: 13px;
    font-weight: 500;
}

/* Hero */

.hero-small {
    color: #9da8ff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    margin-bottom: 12px;
}

.hero-title {
    font-size: 52px;
    line-height: 1.05;
    font-weight: 800;
    color: white;
    margin: 0;
}

.hero-title span {
    color: #8f9aff;
}

.hero-description {
    color: #aeb8dc;
    font-size: 16px;
    line-height: 1.7;
    max-width: 650px;
    margin-top: 20px;
}

.hero-box {
    padding: 35px;
    border-radius: 24px;
    background: rgba(5,8,30,0.58);
    border: 1px solid rgba(255,255,255,0.11);
    backdrop-filter: blur(15px);
}

/* Cards */

.feature-card {
    padding: 25px;
    min-height: 190px;
    border-radius: 18px;
    background: rgba(5,8,30,0.65);
    border: 1px solid rgba(255,255,255,0.11);
    transition: 0.3s;
}

.feature-number {
    color: #8f9aff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
}

.feature-card h3 {
    color: white;
    margin-top: 15px;
    font-size: 20px;
}

.feature-card p {
    color: #9fa9ca;
    font-size: 13px;
    line-height: 1.6;
}

/* Page headings */

.page-label {
    color: #9da8ff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.page-title {
    color: white;
    font-size: 34px;
    font-weight: 750;
    margin-bottom: 8px;
}

.page-description {
    color: #aeb8dc;
    font-size: 14px;
    margin-bottom: 30px;
}

/* Glass card */

.glass-card {
    padding: 30px;
    border-radius: 20px;
    background: rgba(5,8,30,0.72);
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(14px);
}

/* Buttons */

.stButton > button {
    border-radius: 10px !important;
    border: 1px solid rgba(255,255,255,0.12) !important;
    background: #6875e8 !important;
    color: white !important;
    font-weight: 600 !important;
    min-height: 42px;
}

.stButton > button:hover {
    background: #7b86f2 !important;
}

/* Inputs */

.stTextInput input,
.stTextArea textarea,
.stSelectbox div[data-baseweb="select"] > div {
    background: rgba(255,255,255,0.06) !important;
    color: white !important;
    border-color: rgba(255,255,255,0.14) !important;
}

label {
    color: #dfe5ff !important;
}

/* Status */

.status-box {
    padding: 18px 20px;
    border-radius: 14px;
    margin: 18px 0;
}

.pending {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
}

.progress {
    background: rgba(245,185,66,0.10);
    border: 1px solid rgba(245,185,66,0.25);
}

.resolved {
    background: rgba(60,200,130,0.10);
    border: 1px solid rgba(60,200,130,0.25);
}

.status-title {
    color: white;
    font-size: 17px;
    font-weight: 700;
}

.status-text {
    color: #aeb8dc;
    font-size: 13px;
    margin-top: 5px;
}

/* Details */

.detail-box {
    padding: 17px;
    border-radius: 11px;
    background: rgba(255,255,255,0.045);
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 15px;
}

.detail-label {
    color: #8993b7;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
}

.detail-value {
    color: #e8ebff;
    font-size: 14px;
    margin-top: 6px;
}

/* Timeline */

.timeline-step {
    padding: 17px;
    border-left: 3px solid #6875e8;
    margin-bottom: 10px;
    background: rgba(255,255,255,0.035);
}

.timeline-step h4 {
    color: white;
    margin: 0 0 5px;
}

.timeline-step p {
    color: #8993b7;
    font-size: 13px;
    margin: 0;
}

/* Footer */

.footer {
    text-align: center;
    padding: 35px 0 10px;
    color: #70799c;
    font-size: 12px;
}

</style>
""", unsafe_allow_html=True)

# --------------------------------------------------
# NAVBAR
# --------------------------------------------------

st.markdown(f"""
<div class="navbar">

    <div class="brand">
        <img src="{COLLEGE_LOGO}">
        <span class="brand-name">PREVANTA</span>
    </div>

    <div class="nav-text">
        PREVENT BEFORE MISHAP
    </div>

</div>
""", unsafe_allow_html=True)

# --------------------------------------------------
# NAVIGATION
# --------------------------------------------------

nav1, nav2, nav3, nav4, nav5 = st.columns(
    [1, 1, 1, 1, 1]
)

with nav1:
    if st.button("Home", use_container_width=True):
        st.session_state.page = "Home"

with nav2:
    if st.button("Dashboard", use_container_width=True):
        st.session_state.page = "Dashboard"

with nav3:
    if st.button("Register", use_container_width=True):
        st.session_state.page = "Register"

with nav4:
    if st.button("Report Issue", use_container_width=True):
        if st.session_state.verified:
            st.session_state.page = "Report"
        else:
            st.session_state.page = "Register"

with nav5:
    if st.button("Tracking", use_container_width=True):
        st.session_state.page = "Tracking"

st.write("")

# ==================================================
# HOME
# ==================================================

if st.session_state.page == "Home":

    st.markdown("""
    <div class="hero-box">

        <div class="hero-small">
            PREVENT BEFORE MISHAP
        </div>

        <div class="hero-title">
            Prevent Accidents<br>
            <span>Before They Happen</span>
        </div>

        <div class="hero-description">
            PREVANTA is a campus infrastructure complaint
            and monitoring system that helps students report
            problems early so authorities can respond before
            they become serious incidents.
        </div>

    </div>
    """, unsafe_allow_html=True)

    st.write("")

    col1, col2 = st.columns(2)

    with col1:
        if st.button(
            "Report an Issue →",
            use_container_width=True
        ):
            if st.session_state.verified:
                st.session_state.page = "Report"
            else:
                st.session_state.page = "Register"
            st.rerun()

    with col2:
        if st.button(
            "Track Complaint →",
            use_container_width=True
        ):
            st.session_state.page = "Tracking"
            st.rerun()

    st.write("")
    st.write("")

    c1, c2, c3 = st.columns(3)

    with c1:
        st.markdown("""
        <div class="feature-card">
            <div class="feature-number">01</div>
            <h3>Report</h3>
            <p>
                Students can quickly report damaged,
                broken or unsafe campus infrastructure.
            </p>
        </div>
        """, unsafe_allow_html=True)

    with c2:
        st.markdown("""
        <div class="feature-card">
            <div class="feature-number">02</div>
            <h3>Track</h3>
            <p>
                Students can check the current progress
                of their submitted complaint.
            </p>
        </div>
        """, unsafe_allow_html=True)

    with c3:
        st.markdown("""
        <div class="feature-card">
            <div class="feature-number">03</div>
            <h3>Resolve</h3>
            <p>
                Authorities can review complaints and
                update their progress until resolution.
            </p>
        </div>
        """, unsafe_allow_html=True)

# ==================================================
# REGISTER
# ==================================================

elif st.session_state.page == "Register":

    st.markdown("""
    <div class="page-label">STUDENT VERIFICATION</div>
    <div class="page-title">Verify Your Identity</div>
    <div class="page-description">
        Only verified college students can report
        campus infrastructure issues.
    </div>
    """, unsafe_allow_html=True)

    with st.form("student_verification"):

        name = st.text_input(
            "Student Name",
            placeholder="Enter your full name"
        )

        roll = st.text_input(
            "Roll Number",
            placeholder="Enter your college roll number"
        )

        email = st.text_input(
            "College Email ID",
            placeholder="Enter your college email"
        )

        submitted = st.form_submit_button(
            "Verify Student",
            use_container_width=True
        )

        if submitted:

            if name and roll and email:

                st.session_state.verified = True
                st.session_state.student = {
                    "name": name,
                    "roll": roll,
                    "email": email
                }

                st.success(
                    "Student verification successful!"
                )

                st.session_state.page = "Report"

                st.rerun()

            else:
                st.error(
                    "Please fill all verification details."
                )

# ==================================================
# DASHBOARD
# ==================================================

elif st.session_state.page == "Dashboard":

    st.markdown("""
    <div class="page-label">STUDENT DASHBOARD</div>
    <div class="page-title">Your Complaint Dashboard</div>
    <div class="page-description">
        View your complaint activity and current status.
    </div>
    """, unsafe_allow_html=True)

    complaint = st.session_state.complaint

    c1, c2, c3 = st.columns(3)

    with c1:
        st.metric("Total Complaints", "1" if complaint else "0")

    with c2:
        status = complaint["status"] if complaint else "—"
        st.metric("Current Status", status)

    with c3:
        st.metric(
            "Verification",
            "Verified" if st.session_state.verified else "Not Verified"
        )

    st.write("")

    if complaint:

        st.markdown("""
        <div class="glass-card">
            <h3 style="color:white;">
                Recent Complaint
            </h3>
        </div>
        """, unsafe_allow_html=True)

        st.write("")

        st.write(
            f"**Category:** {complaint['category']}"
        )

        st.write(
            f"**Location:** {complaint['location']}"
        )

        st.write(
            f"**Status:** {complaint['status']}"
        )

        if st.button(
            "Open Tracking",
            use_container_width=True
        ):
            st.session_state.page = "Tracking"
            st.rerun()

    else:
        st.info(
            "You have not submitted any complaint yet."
        )

# ==================================================
# REPORT ISSUE
# ==================================================

elif st.session_state.page == "Report":

    if not st.session_state.verified:

        st.warning(
            "Please verify your student identity first."
        )

        if st.button("Go to Verification"):
            st.session_state.page = "Register"
            st.rerun()

    else:

        st.markdown("""
        <div class="page-label">NEW COMPLAINT</div>
        <div class="page-title">
            Report Infrastructure Issue
        </div>
        <div class="page-description">
            Report any hostel or campus infrastructure problem.
        </div>
        """, unsafe_allow_html=True)

        with st.form("complaint_form"):

            category = st.selectbox(
                "Issue Category",
                [
                    "Select Category",
                    "Structural",
                    "Electrical",
                    "Plumbing",
                    "Furniture",
                    "Other"
                ]
            )

            description = st.text_area(
                "Describe the Problem",
                placeholder="Describe what is wrong..."
            )

            st.markdown(
                "### Location"
            )

            col1, col2 = st.columns(2)

            with col1:

                location_type = st.selectbox(
                    "Location Type",
                    [
                        "Select Location",
                        "Boys Hostel",
                        "Girls Hostel",
                        "Academic Block",
                        "Administrative Block",
                        "Library",
                        "Laboratory",
                        "Canteen",
                        "Sports Area",
                        "Parking Area",
                        "Other Campus Area"
                    ]
                )

            with col2:

                block = st.selectbox(
                    "Block / Building",
                    [
                        "Select Block / Building",
                        "A Block",
                        "B Block",
                        "C Block",
                        "D Block",
                        "Main Building",
                        "Other Building"
                    ]
                )

            col3, col4 = st.columns(2)

            with col3:

                room = st.text_input(
                    "Room Number (Optional)",
                    placeholder="Example: B-204"
                )

            with col4:

                exact_location = st.text_input(
                    "Exact Location / Area",
                    placeholder="Example: Near main entrance"
                )

            st.markdown(
                "### Upload Evidence"
            )

            photo = st.file_uploader(
                "Add a photo of the problem",
                type=["jpg", "jpeg", "png"]
            )

            submit = st.form_submit_button(
                "Continue to Complaint Details",
                use_container_width=True
            )

            if submit:

                if (
                    category != "Select Category"
                    and description
                    and location_type != "Select Location"
                    and block != "Select Block / Building"
                    and exact_location
                ):

                    st.session_state.complaint = {
                        "category": category,
                        "description": description,
                        "location_type": location_type,
                        "block": block,
                        "room": room,
                        "location": exact_location,
                        "photo": photo.name if photo else "No photo attached",
                        "status": "Pending"
                    }

                    st.session_state.page = "Complaint"

                    st.rerun()

                else:

                    st.error(
                        "Please fill all required fields."
                    )

# ==================================================
# COMPLAINT DETAILS
# ==================================================

elif st.session_state.page == "Complaint":

    complaint = st.session_state.complaint

    if not complaint:

        st.info("No complaint available.")

    else:

        st.markdown("""
        <div class="page-label">COMPLAINT PREVIEW</div>
        <div class="page-title">
            Complaint Details
        </div>
        <div class="page-description">
            Review your complaint before submitting it.
        </div>
        """, unsafe_allow_html=True)

        st.markdown(
            '<div class="glass-card">',
            unsafe_allow_html=True
        )

        st.write(
            f"**Category:** {complaint['category']}"
        )

        st.write(
            f"**Location Type:** {complaint['location_type']}"
        )

        st.write(
            f"**Block / Building:** {complaint['block']}"
        )

        st.write(
            f"**Room:** {complaint['room'] or 'Not Applicable'}"
        )

        st.write(
            f"**Exact Location:** {complaint['location']}"
        )

        st.write(
            f"**Problem:** {complaint['description']}"
        )

        st.write(
            f"**Photo:** {complaint['photo']}"
        )

        st.markdown(
            '</div>',
            unsafe_allow_html=True
        )

        st.write("")

        col1, col2 = st.columns(2)

        with col1:

            if st.button(
                "← Edit Complaint",
                use_container_width=True
            ):
                st.session_state.page = "Report"
                st.rerun()

        with col2:

            if st.button(
                "Submit Complaint",
                use_container_width=True
            ):

                st.session_state.complaint[
                    "submitted"
                ] = True

                st.session_state.complaint[
                    "status"
                ] = "Pending"

                st.session_state.page = "Tracking"

                st.rerun()

# ==================================================
# TRACKING
# ==================================================

elif st.session_state.page == "Tracking":

    complaint = st.session_state.complaint

    st.markdown("""
    <div class="page-label">COMPLAINT TRACKING</div>
    <div class="page-title">
        Track Your Complaint
    </div>
    <div class="page-description">
        Check the current progress of your reported issue.
    </div>
    """, unsafe_allow_html=True)

    if not complaint:

        st.markdown("""
        <div class="glass-card" style="text-align:center;">
            <h2 style="color:white;">
                No Complaint Found
            </h2>
            <p style="color:#aeb8dc;">
                You have not submitted any complaint yet.
            </p>
        </div>
        """, unsafe_allow_html=True)

    else:

        status = complaint["status"]

        if status == "Pending":

            st.markdown("""
            <div class="status-box pending">
                <div class="status-title">
                    ⏳ Complaint is Pending
                </div>
                <div class="status-text">
                    Your complaint has been submitted
                    and is waiting for authority review.
                </div>
            </div>
            """, unsafe_allow_html=True)

        elif status == "In Progress":

            st.markdown("""
            <div class="status-box progress">
                <div class="status-title">
                    🔄 Complaint is In Progress
                </div>
                <div class="status-text">
                    The authority has reviewed your
                    complaint and action is currently in progress.
                </div>
            </div>
            """, unsafe_allow_html=True)

        else:

            st.markdown("""
            <div class="status-box resolved">
                <div class="status-title">
                    ✅ Complaint Resolved
                </div>
                <div class="status-text">
                    The reported infrastructure issue
                    has been marked as resolved.
                </div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown(
            "### Complaint Details"
        )

        col1, col2 = st.columns(2)

        with col1:

            st.markdown(
                f"""
                <div class="detail-box">
                    <div class="detail-label">CATEGORY</div>
                    <div class="detail-value">
                        {complaint['category']}
                    </div>
                </div>
                """,
                unsafe_allow_html=True
            )

        with col2:

            st.markdown(
                f"""
                <div class="detail-box">
                    <div class="detail-label">LOCATION TYPE</div>
                    <div class="detail-value">
                        {complaint['location_type']}
                    </div>
                </div>
                """,
                unsafe_allow_html=True
            )

        col3, col4 = st.columns(2)

        with col3:

            st.markdown(
                f"""
                <div class="detail-box">
                    <div class="detail-label">BLOCK / BUILDING</div>
                    <div class="detail-value">
                        {complaint['block']}
                    </div>
                </div>
                """,
                unsafe_allow_html=True
            )

        with col4:

            st.markdown(
                f"""
                <div class="detail-box">
                    <div class="detail-label">ROOM NUMBER</div>
                    <div class="detail-value">
                        {complaint['room'] or 'Not Applicable'}
                    </div>
                </div>
                """,
                unsafe_allow_html=True
            )

        st.markdown(
            f"""
            <div class="detail-box">
                <div class="detail-label">EXACT LOCATION</div>
                <div class="detail-value">
                    {complaint['location']}
                </div>
            </div>

            <div class="detail-box">
                <div class="detail-label">PROBLEM DESCRIPTION</div>
                <div class="detail-value">
                    {complaint['description']}
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )

        st.write("")

        st.markdown(
            "### Complaint Progress"
        )

        steps = [
            (
                "Complaint Submitted",
                "Your complaint has been submitted successfully."
            ),
            (
                "Under Review",
                "Authority is reviewing the reported infrastructure issue."
            ),
            (
                "In Progress",
                "Action is being taken on your reported issue."
            ),
            (
                "Resolved",
                "Complaint has been resolved by the authority."
            )
        ]

        for index, (title, text) in enumerate(steps):

            active = False

            if index == 0:
                active = True

            if status == "In Progress" and index <= 2:
                active = True

            if status == "Resolved" and index <= 3:
                active = True

            border = "#6875e8" if active else "#39405e"

            st.markdown(
                f"""
                <div class="timeline-step"
                     style="border-left-color:{border};">

                    <h4>
                        {'✓ ' if active else str(index + 1) + '. '}
                        {title}
                    </h4>

                    <p>{text}</p>

                </div>
                """,
                unsafe_allow_html=True
            )

# --------------------------------------------------
# FOOTER
# --------------------------------------------------

st.markdown("""
<div class="footer">
    © 2026 PREVANTA | Hostel & Campus Infrastructure Support
</div>
""", unsafe_allow_html=True)