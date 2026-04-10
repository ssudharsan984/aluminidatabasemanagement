const mongoose = require('mongoose');
const Alumni = require('./models/Alumni');
const Event = require('./models/Event');

const MONGO_URI = 'mongodb+srv://ssudharsan984_db_user:sudhar123@cluster0.zkjpzjv.mongodb.net/alumniDB?retryWrites=true&w=majority';

const alumniData = [
  { name: 'Arjun Kumar',      email: 'arjun.kumar@gmail.com',    phone: '9876543210', batchYear: 2018, department: 'Computer Science',      company: 'Google',       designation: 'Software Engineer',        location: 'Bangalore',  linkedin: 'linkedin.com/in/arjunkumar' },
  { name: 'Priya Sharma',     email: 'priya.sharma@gmail.com',   phone: '9876543211', batchYear: 2019, department: 'Information Technology', company: 'Microsoft',    designation: 'Senior Developer',         location: 'Hyderabad',  linkedin: 'linkedin.com/in/priyasharma' },
  { name: 'Rahul Verma',      email: 'rahul.verma@gmail.com',    phone: '9876543212', batchYear: 2017, department: 'Electronics',            company: 'Intel',        designation: 'Hardware Engineer',        location: 'Pune',       linkedin: 'linkedin.com/in/rahulverma' },
  { name: 'Sneha Patel',      email: 'sneha.patel@gmail.com',    phone: '9876543213', batchYear: 2020, department: 'Mechanical',             company: 'Tata Motors',  designation: 'Design Engineer',          location: 'Mumbai',     linkedin: 'linkedin.com/in/snehapatel' },
  { name: 'Vikram Singh',     email: 'vikram.singh@gmail.com',   phone: '9876543214', batchYear: 2016, department: 'Computer Science',       company: 'Amazon',       designation: 'SDE-2',                    location: 'Chennai',    linkedin: 'linkedin.com/in/vikramsingh' },
  { name: 'Ananya Reddy',     email: 'ananya.reddy@gmail.com',   phone: '9876543215', batchYear: 2021, department: 'MBA',                    company: 'Deloitte',     designation: 'Business Analyst',         location: 'Delhi',      linkedin: 'linkedin.com/in/ananyareddy' },
  { name: 'Karthik Nair',     email: 'karthik.nair@gmail.com',   phone: '9876543216', batchYear: 2018, department: 'Information Technology', company: 'Infosys',      designation: 'Tech Lead',                location: 'Bangalore',  linkedin: 'linkedin.com/in/karthiknair' },
  { name: 'Divya Menon',      email: 'divya.menon@gmail.com',    phone: '9876543217', batchYear: 2019, department: 'Computer Science',       company: 'Wipro',        designation: 'Full Stack Developer',     location: 'Kochi',      linkedin: 'linkedin.com/in/divyamenon' },
  { name: 'Suresh Babu',      email: 'suresh.babu@gmail.com',    phone: '9876543218', batchYear: 2015, department: 'Civil',                  company: 'L&T',          designation: 'Project Manager',          location: 'Chennai',    linkedin: 'linkedin.com/in/sureshbabu' },
  { name: 'Meera Iyer',       email: 'meera.iyer@gmail.com',     phone: '9876543219', batchYear: 2020, department: 'MCA',                    company: 'TCS',          designation: 'Software Developer',       location: 'Coimbatore', linkedin: 'linkedin.com/in/meeraiyer' },
  { name: 'Arun Krishnan',    email: 'arun.krishnan@gmail.com',  phone: '9876543220', batchYear: 2017, department: 'Electrical',             company: 'BHEL',         designation: 'Electrical Engineer',      location: 'Trichy',     linkedin: 'linkedin.com/in/arunkrishnan' },
  { name: 'Pooja Gupta',      email: 'pooja.gupta@gmail.com',    phone: '9876543221', batchYear: 2022, department: 'Computer Science',       company: 'Zoho',         designation: 'Junior Developer',         location: 'Chennai',    linkedin: 'linkedin.com/in/poojagupta' },
  { name: 'Rajesh Pandey',    email: 'rajesh.pandey@gmail.com',  phone: '9876543222', batchYear: 2016, department: 'Mechanical',             company: 'Mahindra',     designation: 'Senior Engineer',          location: 'Nashik',     linkedin: 'linkedin.com/in/rajeshpandey' },
  { name: 'Lakshmi Devi',     email: 'lakshmi.devi@gmail.com',   phone: '9876543223', batchYear: 2018, department: 'MBA',                    company: 'HDFC Bank',    designation: 'Branch Manager',           location: 'Madurai',    linkedin: 'linkedin.com/in/lakshmidevi' },
  { name: 'Sanjay Mishra',    email: 'sanjay.mishra@gmail.com',  phone: '9876543224', batchYear: 2019, department: 'Information Technology', company: 'HCL',          designation: 'System Analyst',           location: 'Noida',      linkedin: 'linkedin.com/in/sanjaymishra' },
  { name: 'Kavitha Rajan',    email: 'kavitha.rajan@gmail.com',  phone: '9876543225', batchYear: 2021, department: 'Computer Science',       company: 'Freshworks',   designation: 'Product Engineer',         location: 'Chennai',    linkedin: 'linkedin.com/in/kavitharajan' },
  { name: 'Deepak Joshi',     email: 'deepak.joshi@gmail.com',   phone: '9876543226', batchYear: 2017, department: 'Electronics',            company: 'Samsung',      designation: 'R&D Engineer',             location: 'Noida',      linkedin: 'linkedin.com/in/deepakjoshi' },
  { name: 'Nithya Sundaram',  email: 'nithya.sundaram@gmail.com',phone: '9876543227', batchYear: 2020, department: 'MCA',                    company: 'Cognizant',    designation: 'Associate Developer',      location: 'Bangalore',  linkedin: 'linkedin.com/in/nithyasundaram' },
  { name: 'Venkat Raman',     email: 'venkat.raman@gmail.com',   phone: '9876543228', batchYear: 2015, department: 'Civil',                  company: 'Shapoorji',    designation: 'Site Engineer',            location: 'Mumbai',     linkedin: 'linkedin.com/in/venkatraman' },
  { name: 'Harini Balaji',    email: 'harini.balaji@gmail.com',  phone: '9876543229', batchYear: 2022, department: 'Information Technology', company: 'Accenture',    designation: 'Software Engineer',        location: 'Pune',       linkedin: 'linkedin.com/in/harinibalaji' }
];

const eventData = [
  { title: 'Annual Alumni Meet 2024',      description: 'Yearly gathering of all alumni with networking sessions',    eventDate: '2024-12-15', location: 'College Auditorium, Chennai' },
  { title: 'Tech Talk: AI & ML Trends',    description: 'Guest lecture on latest AI and Machine Learning trends',     eventDate: '2024-11-20', location: 'Seminar Hall, Block A' },
  { title: 'Career Guidance Workshop',     description: 'Resume building, interview tips and career counseling',      eventDate: '2024-11-30', location: 'Conference Room, Admin Block' },
  { title: 'Startup Pitch Competition',    description: 'Alumni entrepreneurs pitch their startup ideas',             eventDate: '2025-01-10', location: 'Innovation Hub, Chennai' },
  { title: 'Sports Day & Cultural Fest',   description: 'Annual sports and cultural event for alumni and students',   eventDate: '2025-02-14', location: 'College Grounds' }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB Atlas');

  await Alumni.deleteMany({});
  await Event.deleteMany({});
  console.log('🗑️  Cleared existing data');

  await Alumni.insertMany(alumniData);
  console.log('✅ Inserted 20 alumni records');

  await Event.insertMany(eventData);
  console.log('✅ Inserted 5 events');

  console.log('🎉 Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
