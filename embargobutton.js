var embargoButton = $('#apply-embargo').kendoButton({
                enable: false,
                click: function () {
                    $('#feedback').text('');
                    embargoDate = kendo.toString(embargoDatePicker.value(), 's');
                    var modelIds = [];
                    $('.model-checkbox:checked').each(function () {
                        modelIds.push($(this).val());
                    });
                    if (modelIds.length) {
                        $.ajax({
                            url: '@Url.RouteUrl("SetModelEmbargoDates")',
                            type: 'POST',
                            data: JSON.stringify({ modelIds: modelIds, embargoUntil: embargoDate }),
                            contentType: 'application/json; charset=utf-8'
                        })
                        .done(function () {
                            gridModel.nvd.read();
                            $('#feedback').css('color', 'green').text('Embargo request completed successfully.');
                            $('#check-all').prop('checked', false);
                        })
                        .fail(function () {
                            $('#feedback').css('color', 'red').text('An error occurred.');
                        })
                        .always(function () {
                        });
                    } else {
                        alert('Please select at least one item to embargo.');
                    }
                }
            }).data('kendoButton');


https://code.msdn.microsoft.com/How-to-post-complex-JSON-d15bb765
