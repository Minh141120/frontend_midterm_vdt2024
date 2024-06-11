{{/*
Return the fully qualified app name.
*/}}
{{- define "web.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Return the name of the chart.
*/}}
{{- define "web.name" -}}
{{- printf "%s" .Chart.Name -}}
{{- end -}}
