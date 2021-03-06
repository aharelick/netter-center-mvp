$(document).ready(function () {

	// gets all the tags from the json file and makes them options
	// in the select element for the library to use
	$.getJSON('/json/tags.json', function(data) {
		$.each(data, function(index, value) {
			$('.tag-select').append('<option value="' + value + '">' + value + '</option>');
		});
		$('.tag-select').tokenize({
			newElements: false,
			placeholder: "enter tag(s) here..."
		});
	});

	filepicker.setKey("AISv3IWs7SNW1CjG0QFz8z");
	$("#filepicker-trigger").click(function() {
		filepicker.pick({
			mimetypes: ['image/*'],
		},
		function(Blob) {
			$("#filepicker-trigger").removeClass("btn-default").addClass("btn-success");
			$("#filepicker-trigger").html("Change File");
    		$("input[name='image']").val(Blob.url)
    	});
	});


	// helper function to change the text of attributes
	function changeAtt(att1, att2, att3) {
		$(".attr:eq(0)").html(att1);
		$(".attr:eq(1)").html(att2);
		$(".attr:eq(2)").html(att3);
	}

	// make attributes correspond to stakeholder position type
	$("#stakeholder").change(function() {
		var position = $(this).val();
		if (position == "students") {
			changeAtt("Experience", "Program/Group", "Site");
		}
		else if (position == "faculty") {
			changeAtt("Department", "Courses Taught", "Research Interests");
		}
		else if (position == "community-members") {
			changeAtt("Professional Skills", "Program Interests", "Group/Netter Involvement");
		}
		else if (position == "netter-staff") {
			changeAtt("Position/Role", "Projects/Specific Involvements", "Professional Skills");
		}
		else if (position == "alumni-friends") {
			changeAtt("Professional Skills", "Areas of Interest", "Projects/Specific Involvement w/ Netter");
		}
	});


	function makeTagArray(tagNum) {
		tags = [];
		$('span[tagnum="' + tagNum + '"]').each(function(i,el){
			  tags.push($(el).text());
		});
		return tags;
	}

	$( "#mainForm" ).validate({
	  rules: {
	    fruit: {
	      required: true
	    }
	  }
	});

	/* creates form and submits it to the POST url
	I did this like this because I didn't know how the the form would deal
	with the weird format of tags in the select boxes. In the future we should be graying
	this box out when the user shouldn't be able to submit (all the fields not filled out)
	and maybe make the whole page a form. */
	$('#submit').click(function() {
		if ($('#mainForm').valid()) {
			var att1Tags = makeTagArray(1);
			var att2Tags = makeTagArray(2);
			var att3Tags = makeTagArray(3);

			var form = $('<form />', {
				action: '/create-profile',
				method: 'POST',
				style: 'display: none;'
				});
				$('.data').appendTo(form);
				$('<input>').attr({
				    type: 'hidden',
				    name: 'tags1',
				    value: JSON.stringify(att1Tags)
				}).appendTo(form);
				$('<input>').attr({
				    type: 'hidden',
				    name: 'tags2',
				    value: JSON.stringify(att2Tags)
				}).appendTo(form);
				$('<input>').attr({
				    type: 'hidden',
				    name: 'tags3',
				    value: JSON.stringify(att3Tags)
				}).appendTo(form);
				form.appendTo('body').submit();
		}
	});
	
});