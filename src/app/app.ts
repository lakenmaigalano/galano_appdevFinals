import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from
'@angular/fire/firestore';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './app.html',
styleUrls: ['./app.css']
})
export class App {
title = signal('APPDEV Angular with Firebase Demonstration with Student Management System');

studentName = signal('');
studentCourse = signal('')
studentEmail = signal('')
studentUsername = signal('')
studentPassword = signal ('')
students: any[] = [];

constructor(private firestore: Firestore) {
const studentsCollection = collection(this.firestore, 'students');
collectionData(studentsCollection, { idField: 'id' })
.subscribe(data => {
this.students = data; // Assign to array so Angular detects changes
});
}

addStudent() {
const name = this.studentName();
const course = this.studentCourse();
const email = this.studentEmail();
const username = this.studentUsername();
const password = this.studentPassword();
if (name && course && email && username && password) {
const studentsCollection = collection(this.firestore, 'students');
addDoc(studentsCollection, { name, course, email, username, password });
this.studentName.set('');
this.studentCourse.set('');
this.studentEmail.set('');
this.studentUsername.set('');
this.studentPassword.set('');

}
}

deleteStudent(id: string) {
const studentDoc = doc(this.firestore, `students/${id}`);
deleteDoc(studentDoc);
}

updateStudent(id: string, newName: string,  newCourse: string, newEmail: string, newUsername: string, newPassword: string) {
const studentDoc = doc(this.firestore, `students/${id}`);
updateDoc(studentDoc, { name: newName,  course: newCourse, email: newEmail, username: newUsername,  password: newPassword});
}
}
