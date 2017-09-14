import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from "./comment.model";
import { AuthService } from "../../services/auth.service";
import { CommentService } from "./comment.service";
import { AlertService } from "../../alert/alert.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

	@Input() comment: Comment;
	@Input() eventId: number;
	@Output() deletedComment = new EventEmitter<number>();
  private showEditForm: boolean = false

  constructor(
  	private authService: AuthService,
  	private commentService: CommentService,
  	private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

	canDelete() {
 		return (this.authService.isLoggedIn() && +this.authService.getUser().id == this.comment.user_id);
	}
	deleteComment() {
		this.commentService.deleteComment(this.comment.id)
		.then(res => {
			this.deletedComment.emit(this.comment.id);
			this.alertService.show(res.message);
		});
	}
	editComment() {
		this.showEditForm = !this.showEditForm;
	}
}
